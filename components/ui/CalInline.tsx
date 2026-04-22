'use client'

import { useEffect, useRef } from 'react'

export default function CalInline({ calLink }: { calLink: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current || !containerRef.current) return
    initialized.current = true

    const id = 'cal-embed-container'
    containerRef.current.id = id

    const script = document.createElement('script')
    script.innerHTML = `
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal; let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {}; cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      Cal("init", "booking", { origin: "https://cal.com" });

      Cal.ns["booking"]("inline", {
        elementOrSelector: "#${id}",
        calLink: "${calLink}",
        config: { layout: "month_view" },
      });

      Cal.ns["booking"]("ui", {
        styles: { branding: { brandColor: "#7C5CFF" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    `
    document.head.appendChild(script)
  }, [calLink])

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', minHeight: '650px', overflow: 'hidden' }}
    />
  )
}
