import { useEffect, useMemo, useRef, useState } from "react";
import AppButton from "../../components/UI/AppButton";
import SelectInput from "../../components/UI/SelectInput";
import TextInput from "../../components/UI/TextInput";
import TitleText from "../../components/UI/TitleText";

const THEME_PRESETS = {
  classic: {
    label: "Classic White",
    background: "#f8fafc",
    accent: "#0f172a",
    panel: "#ffffff",
    frame: "#e2e8f0",
    frameInner: "#ffffff",
  },
  peach: {
    label: "Peach Pop",
    background: "#fed7aa",
    accent: "#7c2d12",
    panel: "#ffedd5",
    frame: "#fdba74",
    frameInner: "#fff7ed",
  },
  mint: {
    label: "Mint Fresh",
    background: "#a7f3d0",
    accent: "#065f46",
    panel: "#d1fae5",
    frame: "#6ee7b7",
    frameInner: "#ecfdf5",
  },
};

const getThemePreset = (themeKey) =>
  THEME_PRESETS[themeKey] ?? THEME_PRESETS.classic;

const withAlpha = (hex, alpha) => {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) return `rgba(15, 23, 42, ${alpha})`;

  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const SHOT_COUNT_OPTIONS = [
  { label: "3", value: 3 },
  { label: "4", value: 4 },
];

const COUNTDOWN_OPTIONS = [
  { label: "3 seconds", value: 3 },
  { label: "5 seconds", value: 5 },
];

const stopMediaStream = (stream) => {
  if (!stream) return;
  stream.getTracks().forEach((track) => track.stop());
};

const drawCoverCanvas = (ctx, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
};

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load captured image."));
    image.src = src;
  });

const canvasToBlob = (canvas, type = "image/png", quality) =>
  new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to convert canvas to blob."));
      },
      type,
      quality,
    );
  });

const drawImageCover = (
  ctx,
  image,
  targetX,
  targetY,
  targetWidth,
  targetHeight,
) => {
  const sourceAspect = image.width / image.height;
  const targetAspect = targetWidth / targetHeight;

  let sourceWidth = image.width;
  let sourceHeight = image.height;
  let sourceX = 0;
  let sourceY = 0;

  if (sourceAspect > targetAspect) {
    sourceWidth = image.height * targetAspect;
    sourceX = (image.width - sourceWidth) / 2;
  } else {
    sourceHeight = image.width / targetAspect;
    sourceY = (image.height - sourceHeight) / 2;
  }

  ctx.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    targetX,
    targetY,
    targetWidth,
    targetHeight,
  );
};

const buildPhotoStrip = async ({ shots, boothLabel, themeKey }) => {
  const theme = getThemePreset(themeKey);

  const stripWidth = 720;
  const margin = 30;
  const gap = 18;
  const topPanel = 90;
  const bottomPanel = 80;
  const photoHeight = 420;
  const photoFramePadding = 14;
  const photoInnerPadding = 10;
  const photoX = margin + 20;
  const photoWidth = stripWidth - (margin + 20) * 2;
  const stripHeight =
    topPanel +
    bottomPanel +
    margin * 2 +
    shots.length * photoHeight +
    (shots.length - 1) * gap;

  const canvas = document.createElement("canvas");
  canvas.width = stripWidth;
  canvas.height = stripHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas context is unavailable.");
  }

  drawCoverCanvas(ctx, stripWidth, stripHeight, theme.background);

  ctx.fillStyle = theme.panel;
  ctx.fillRect(
    margin,
    margin,
    stripWidth - margin * 2,
    stripHeight - margin * 2,
  );

  ctx.fillStyle = theme.accent;
  ctx.font = "700 32px 'Segoe UI', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(boothLabel, stripWidth / 2, margin + 40);

  const now = new Date();
  const stampedDate = now.toLocaleString("en-PH", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  let cursorY = margin + topPanel;
  for (const shot of shots) {
    const frameX = photoX - photoFramePadding;
    const frameY = cursorY - photoFramePadding;
    const frameWidth = photoWidth + photoFramePadding * 2;
    const frameHeight = photoHeight + photoFramePadding * 2;

    ctx.fillStyle = theme.frame;
    ctx.fillRect(frameX, frameY, frameWidth, frameHeight);

    ctx.strokeStyle = theme.accent;
    ctx.lineWidth = 3;
    ctx.strokeRect(frameX, frameY, frameWidth, frameHeight);

    ctx.fillStyle = theme.frameInner;
    ctx.fillRect(
      frameX + photoInnerPadding,
      frameY + photoInnerPadding,
      frameWidth - photoInnerPadding * 2,
      frameHeight - photoInnerPadding * 2,
    );

    const image = await loadImage(shot);
    drawImageCover(ctx, image, photoX, cursorY, photoWidth, photoHeight);
    cursorY += photoHeight + gap;
  }

  ctx.fillStyle = theme.accent;
  ctx.font = "600 22px 'Segoe UI', sans-serif";
  ctx.fillText(stampedDate, stripWidth / 2, stripHeight - margin - 20);

  return canvas;
};

const THEME_OPTIONS = Object.entries(THEME_PRESETS).map(([key, value]) => ({
  label: value.label,
  value: key,
}));

const Photobooth = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const countdownTimerRef = useRef(null);

  const [mode, setMode] = useState("idle");
  const [cameraError, setCameraError] = useState("");
  const [shots, setShots] = useState([]);
  const [currentShot, setCurrentShot] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [isRenderingStrip, setIsRenderingStrip] = useState(false);
  const [settings, setSettings] = useState({
    shotCount: 4,
    countdownSeconds: 3,
    themeKey: "classic",
    boothLabel: "Snap Booth",
  });

  const activeTheme = useMemo(
    () => getThemePreset(settings.themeKey),
    [settings.themeKey],
  );

  const progressText = useMemo(() => {
    if (!shots.length) return "No shots yet";
    return `${shots.length}/${settings.shotCount} shots captured`;
  }, [shots.length, settings.shotCount]);

  const shellStyle = useMemo(
    () => ({
      background: `
        radial-gradient(circle at 12% 18%, ${withAlpha(activeTheme.accent, 0.2)} 0%, transparent 35%),
        radial-gradient(circle at 86% 14%, ${withAlpha(activeTheme.frame, 0.58)} 0%, transparent 33%),
        linear-gradient(160deg, ${activeTheme.background} 0%, ${activeTheme.frameInner} 100%)
      `,
    }),
    [activeTheme],
  );

  useEffect(() => {
    return () => {
      clearTimeout(countdownTimerRef.current);
      stopMediaStream(streamRef.current);
    };
  }, []);

  useEffect(() => {
    if (mode !== "capturing") {
      clearTimeout(countdownTimerRef.current);
      return undefined;
    }

    if (currentShot >= settings.shotCount) {
      setMode("review");
      return undefined;
    }

    if (countdown === 0) {
      const captured = captureShot();
      if (captured) {
        const isLastShot = currentShot + 1 >= settings.shotCount;
        if (isLastShot) {
          setMode("review");
        } else {
          setCurrentShot((prev) => prev + 1);
          setCountdown(settings.countdownSeconds);
        }
      } else {
        setMode("idle");
      }
      return undefined;
    }

    countdownTimerRef.current = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(countdownTimerRef.current);
  }, [
    countdown,
    currentShot,
    mode,
    settings.countdownSeconds,
    settings.shotCount,
  ]);

  const ensureCamera = async () => {
    if (streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
      return true;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("This browser does not support camera access.");
      return false;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraError("");
      return true;
    } catch {
      setCameraError("Camera permission denied or no camera device detected.");
      return false;
    }
  };

  const captureShot = () => {
    if (!videoRef.current) return false;

    const video = videoRef.current;
    const width = video.videoWidth;
    const height = video.videoHeight;

    if (!width || !height) {
      setCameraError("Video stream is not ready yet. Please retry.");
      return false;
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return false;

    ctx.scale(-1, 1);
    ctx.drawImage(video, -width, 0, width, height);

    const imageData = canvas.toDataURL("image/jpeg", 0.92);
    setShots((prev) => [...prev, imageData]);
    return true;
  };

  const startSession = async () => {
    const hasCamera = await ensureCamera();
    if (!hasCamera) return;

    setShots([]);
    setCurrentShot(0);
    setCountdown(settings.countdownSeconds);
    setMode("capturing");
  };

  const resetSession = () => {
    clearTimeout(countdownTimerRef.current);
    setShots([]);
    setCurrentShot(0);
    setCountdown(settings.countdownSeconds);
    setMode("idle");
    setCameraError("");
  };

  const stopCamera = () => {
    clearTimeout(countdownTimerRef.current);
    stopMediaStream(streamRef.current);
    streamRef.current = null;
    setMode("idle");
  };

  const generateStripCanvas = async () =>
    buildPhotoStrip({
      shots,
      boothLabel: settings.boothLabel.trim() || "Snap Booth",
      themeKey: settings.themeKey,
    });

  const downloadStrip = async () => {
    if (!shots.length) return;

    setIsRenderingStrip(true);
    try {
      const stripCanvas = await generateStripCanvas();

      const link = document.createElement("a");
      const safeDate = new Date().toISOString().replace(/[:.]/g, "-");
      link.download = `snap-booth-strip-${safeDate}.png`;
      link.href = stripCanvas.toDataURL("image/png");
      link.click();
    } finally {
      setIsRenderingStrip(false);
    }
  };

  const printStrip = async () => {
    if (!shots.length) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      setCameraError(
        "Pop-up blocked. Please allow pop-ups to print the strip.",
      );
      return;
    }

    setIsRenderingStrip(true);
    try {
      const stripCanvas = await generateStripCanvas();
      const stripBlob = await canvasToBlob(stripCanvas);
      const stripUrl = URL.createObjectURL(stripBlob);

      printWindow.document.open();
      printWindow.document.write(`
        <!doctype html>
        <html>
          <head>
            <title>Print Strip</title>
            <style>
              @page { margin: 0; }
              html, body {
                margin: 0;
                padding: 0;
                background: #ffffff;
              }
              .wrap {
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              img {
                max-height: 100vh;
                max-width: 100vw;
                width: auto;
                height: auto;
              }
            </style>
          </head>
          <body>
            <div class="wrap">
              <img id="strip" alt="Snap Booth Strip" />
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();

      const imageElement = printWindow.document.getElementById("strip");
      if (!imageElement) {
        throw new Error("Print image element is missing.");
      }

      imageElement.src = stripUrl;

      const triggerPrint = () => {
        printWindow.focus();
        printWindow.print();

        setTimeout(() => {
          URL.revokeObjectURL(stripUrl);
        }, 30000);
      };

      if (imageElement.complete) {
        setTimeout(triggerPrint, 80);
      } else {
        imageElement.onload = () => setTimeout(triggerPrint, 80);
        imageElement.onerror = () => {
          URL.revokeObjectURL(stripUrl);
          setCameraError("Failed to load strip image in print window.");
          printWindow.close();
        };
      }
    } catch {
      printWindow.close();
      setCameraError("Failed to render strip for printing.");
    } finally {
      setIsRenderingStrip(false);
    }
  };

  return (
    <div className="relative min-h-screen p-4 md:p-6 lg:p-8" style={shellStyle}>
      <div
        className="pointer-events-none absolute left-8 top-8 h-40 w-40 rounded-full blur-3xl"
        style={{ backgroundColor: withAlpha(activeTheme.accent, 0.22) }}
      />
      <div
        className="pointer-events-none absolute bottom-10 right-10 h-56 w-56 rounded-full blur-3xl"
        style={{ backgroundColor: withAlpha(activeTheme.frame, 0.44) }}
      />

      <div className="mx-auto max-w-[1540px] space-y-6">
        <section
          className="rounded-3xl border p-6 shadow-xl backdrop-blur-sm"
          style={{
            backgroundColor: withAlpha(activeTheme.panel, 0.9),
            borderColor: withAlpha(activeTheme.accent, 0.28),
          }}
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <TitleText
                variant="h4"
                color="blue-gray"
                className="font-bold tracking-tight"
                style={{ color: activeTheme.accent }}
              >
                Snap Booth
              </TitleText>
              <p
                className="text-sm"
                style={{ color: withAlpha(activeTheme.accent, 0.76) }}
              >
                No hardware integration yet: browser camera, auto countdown
                capture, strip export.
              </p>
            </div>
            <span
              className="rounded-full border px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor: withAlpha(activeTheme.frameInner, 0.95),
                borderColor: withAlpha(activeTheme.accent, 0.3),
                color: activeTheme.accent,
              }}
            >
              {progressText}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div
              className="w-full rounded-2xl border p-3"
              style={{
                backgroundColor: withAlpha(activeTheme.frameInner, 0.9),
                borderColor: withAlpha(activeTheme.accent, 0.2),
              }}
            >
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Booth label
              </label>
              <TextInput
                label=""
                value={settings.boothLabel}
                onChange={(event) =>
                  setSettings((prev) => ({
                    ...prev,
                    boothLabel: event.target.value,
                  }))
                }
                placeholder="Event name"
                wrapperClassName="w-full"
              />
            </div>

            <div
              className="rounded-2xl border p-3"
              style={{
                backgroundColor: withAlpha(activeTheme.frameInner, 0.9),
                borderColor: withAlpha(activeTheme.accent, 0.2),
              }}
            >
              <SelectInput
                label="Number of shots"
                name="shotCount"
                value={settings.shotCount}
                onChange={(event) =>
                  setSettings((prev) => ({
                    ...prev,
                    shotCount: Number(event.target.value),
                  }))
                }
                options={SHOT_COUNT_OPTIONS}
                showPlaceholderOption={false}
                wrapperClassName="w-full"
                labelClassName="mb-1 block text-sm font-medium text-gray-700"
              />
            </div>

            <div
              className="rounded-2xl border p-3"
              style={{
                backgroundColor: withAlpha(activeTheme.frameInner, 0.9),
                borderColor: withAlpha(activeTheme.accent, 0.2),
              }}
            >
              <SelectInput
                label="Countdown"
                name="countdown"
                value={settings.countdownSeconds}
                onChange={(event) =>
                  setSettings((prev) => ({
                    ...prev,
                    countdownSeconds: Number(event.target.value),
                  }))
                }
                options={COUNTDOWN_OPTIONS}
                showPlaceholderOption={false}
                wrapperClassName="w-full"
                labelClassName="mb-1 block text-sm font-medium text-gray-700"
              />
            </div>

            <div
              className="rounded-2xl border p-3"
              style={{
                backgroundColor: withAlpha(activeTheme.frameInner, 0.9),
                borderColor: withAlpha(activeTheme.accent, 0.2),
              }}
            >
              <SelectInput
                label="Strip theme"
                name="stripTheme"
                value={settings.themeKey}
                onChange={(event) =>
                  setSettings((prev) => ({
                    ...prev,
                    themeKey: event.target.value,
                  }))
                }
                options={THEME_OPTIONS}
                showPlaceholderOption={false}
                wrapperClassName="w-full"
                labelClassName="mb-1 block text-sm font-medium text-gray-700"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
          <div
            className="rounded-3xl border p-4 text-white shadow-2xl"
            style={{
              background: `linear-gradient(165deg, ${withAlpha(activeTheme.accent, 0.95)} 0%, #020617 60%)`,
              borderColor: withAlpha(activeTheme.frame, 0.35),
            }}
          >
            <div className="mb-3 flex items-center justify-between">
              <span
                className="rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                style={{
                  borderColor: withAlpha(activeTheme.frameInner, 0.5),
                  color: activeTheme.frameInner,
                }}
              >
                Live Camera
              </span>
              <span
                className="text-xs"
                style={{ color: withAlpha(activeTheme.frameInner, 0.8) }}
              >
                Auto mode
              </span>
            </div>

            <div
              className="relative overflow-hidden rounded-2xl bg-gray-950 ring-1"
              style={{
                boxShadow: `0 0 0 1px ${withAlpha(activeTheme.frameInner, 0.22)} inset`,
              }}
            >
              <video
                ref={videoRef}
                className="aspect-video w-full scale-x-[-1] object-cover"
                playsInline
                muted
              />
              {mode === "capturing" && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    backgroundColor: withAlpha(activeTheme.accent, 0.35),
                  }}
                >
                  <span
                    className="text-7xl font-black drop-shadow-md"
                    style={{ color: activeTheme.frameInner }}
                  >
                    {countdown}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <AppButton
                onClick={startSession}
                className="bg-blue-700"
                fullWidth={false}
              >
                {mode === "capturing" ? "Restart Session" : "Start Session"}
              </AppButton>
              <AppButton
                onClick={resetSession}
                className="bg-gray-700"
                fullWidth={false}
              >
                Reset Shots
              </AppButton>
              <AppButton
                onClick={stopCamera}
                className="bg-rose-700"
                fullWidth={false}
              >
                Stop Camera
              </AppButton>
            </div>

            {cameraError && (
              <p className="mt-3 text-sm text-rose-300">{cameraError}</p>
            )}
            <p
              className="mt-2 text-xs"
              style={{ color: withAlpha(activeTheme.frameInner, 0.8) }}
            >
              Flow: Start Session - Countdown - Auto Capture - Review - Download
              Strip.
            </p>
          </div>

          <div
            className="rounded-xl border-2 p-4 shadow-sm"
            style={{
              backgroundColor: activeTheme.panel,
              borderColor: activeTheme.accent,
            }}
          >
            <div className="mb-3 flex items-center justify-between">
              <TitleText
                variant="h5"
                color="blue-gray"
                className="font-semibold"
                style={{ color: activeTheme.accent }}
              >
                Captured Photos
              </TitleText>
              <span className="text-xs" style={{ color: activeTheme.accent }}>
                Step: {mode}
              </span>
            </div>

            <div
              className="mb-3 text-xs font-semibold"
              style={{ color: activeTheme.accent }}
            >
              Theme applied: {activeTheme.label}
            </div>

            {!shots.length && (
              <div
                className="rounded-md border-2 border-dashed p-8 text-center text-sm"
                style={{
                  borderColor: activeTheme.accent,
                  color: activeTheme.accent,
                  backgroundColor: activeTheme.frameInner,
                }}
              >
                Your captured photos will appear here.
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {shots.map((shot, index) => (
                <div
                  key={`${index}-${shot.slice(-24)}`}
                  className="overflow-hidden rounded-md border-2 p-2"
                  style={{
                    borderColor: activeTheme.accent,
                    backgroundColor: activeTheme.frame,
                  }}
                >
                  <img
                    src={shot}
                    alt={`Captured shot ${index + 1}`}
                    className="h-40 w-full rounded-sm border object-cover"
                    style={{
                      borderColor: activeTheme.frameInner,
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <AppButton
                onClick={downloadStrip}
                className="!bg-emerald-700 !text-white border border-emerald-900 shadow-md hover:!bg-emerald-800"
                fullWidth={false}
                loading={isRenderingStrip}
                loadingText="Rendering strip..."
                disabled={!shots.length}
              >
                Download Photo Strip
              </AppButton>
              <AppButton
                onClick={printStrip}
                className="bg-indigo-700"
                fullWidth={false}
                loading={isRenderingStrip}
                loadingText="Preparing print..."
                disabled={!shots.length}
              >
                Print Strip
              </AppButton>
              <AppButton
                onClick={() => {
                  setShots([]);
                  setCurrentShot(0);
                  setCountdown(settings.countdownSeconds);
                  setMode("idle");
                }}
                className="bg-orange-700"
                fullWidth={false}
                disabled={!shots.length}
              >
                Retake All
              </AppButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Photobooth;
