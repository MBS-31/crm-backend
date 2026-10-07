import React from 'react';

// Exact Logip network / cluster logo
export const LogipLogo = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* 6 interconnected circular nodes with organic bridges matching the reference */}
    <circle cx="6" cy="7" r="2.2" fill="currentColor" />
    <circle cx="6" cy="14" r="2.2" fill="currentColor" />
    <circle cx="6" cy="21" r="2.2" fill="currentColor" />
    <circle cx="13" cy="7" r="2.2" fill="currentColor" />
    <circle cx="13" cy="14" r="2.2" fill="currentColor" />
    <circle cx="13" cy="21" r="2.2" fill="currentColor" />

    <path d="M6 7V14M6 14V21M13 7V14M13 14V21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M6 7H13M6 14H13M6 21H13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M6 7L13 14M6 14L13 21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// Figma official SVG icon
export const FigmaIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
  </svg>
);

// Task 1: Wave / activity line icon in circle
export const AudioWaveIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="9" stroke="none" fill="transparent" />
    <path d="M5 12h2l2-4 3 8 2.5-6 1.5 2h3" />
  </svg>
);

// Task 3: Terminal code icon
export const TerminalIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="5 8 9 12 5 16" />
    <line x1="12" y1="16" x2="19" y2="16" />
  </svg>
);

// Docker Container Platform Icon
export const DockerIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186zm-2.955 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H8.074a.185.185 0 00-.185.185v1.888c0 .102.083.186.185.186zm0 2.714h2.119a.186.186 0 00.185-.185V9.006a.185.185 0 00-.185-.186H8.074a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.12a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.955 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.165a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm8.864 0h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.887c0 .102.082.185.185.185zm5.908-2.617c-.365-.213-.889-.348-1.554-.348-.12 0-.236.006-.35.016a2.6 2.6 0 00-.638-1.077 2.65 2.65 0 00-1.89-.785h-.13a.186.186 0 00-.186.186v3.714a.186.186 0 00.186.186h4.316a.186.186 0 00.186-.186c0-.655-.178-1.28-.94-1.706zm3.504 3.738c-.378-.266-.99-.344-1.572-.218-.17-.798-.718-1.428-1.488-1.764-.13-.058-.27-.101-.412-.132l-.248-.052v2.781h-2.5v.355c0 .343.03.682.087 1.014.288 1.64 1.484 2.923 3.018 3.328 1.83.483 3.655-.421 4.31-2.155a3.9 3.9 0 00.228-1.258c0-.663-.44-1.353-1.423-1.899zM2.08 12.39c.25 2.378 1.954 4.31 4.296 4.793 4.148.855 8.955.518 12.928-1.442.277-.137.541-.295.79-.472a4.42 4.42 0 00-.518-.28c-.643-.306-1.503-.434-2.316-.279-1.07.204-1.815-.316-2.22-.843a.188.188 0 00-.15-.078H1.99a.186.186 0 00-.186.186c.01.815.11 1.62.276 2.415z" />
  </svg>
);

// MinIO Object Storage Icon
export const MinioIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75 0 4.12 2.56 7.643 6.188 9.062v-2.315c-2.482-1.233-4.188-3.79-4.188-6.747 0-4.28 3.47-7.75 7.75-7.75s7.75 3.47 7.75 7.75c0 2.957-1.706 5.514-4.188 6.747v2.315C19.19 19.643 21.75 16.12 21.75 12c0-5.385-4.365-9.75-9.75-9.75zm-3.5 8a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm7 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-3.5 2.5c-1.38 0-2.5 1.12-2.5 2.5h5c0-1.38-1.12-2.5-2.5-2.5z" />
  </svg>
);

// WhatsApp Cloud API Icon
export const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.507 14.307l-.009.075c-.238.745-.968 1.34-1.724 1.493-.72.146-1.58.077-2.43-.284-1.89-.803-3.486-2.146-4.664-3.923-.497-.75-.826-1.573-.807-2.404.018-.75.466-1.42 1.134-1.782.264-.143.555-.209.849-.17.294.038.56.177.747.388.423.477.828.97 1.215 1.478.188.246.216.574.072.846-.118.223-.298.406-.475.59-.148.154-.15.382-.014.547.467.568 1.016 1.055 1.63 1.444.17.108.388.083.528-.06.188-.19.388-.37.597-.538.256-.205.613-.23 1.01-.137.64.15 1.267.35 1.874.603.277.115.468.375.485.672.01.18-.01.36-.08.528l.006-.065zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.174L2 22l4.982-1.39A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
  </svg>
);

// PostgreSQL Icon
export const PostgresIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.2 16.5c-1.8 0-3.3-1.1-3.9-2.7l1.5-.6c.4 1.1 1.4 1.8 2.5 1.8 1.5 0 2.7-1.1 2.7-2.6 0-1.4-.9-2.2-2.3-2.8l-.8-.3c-1.8-.8-3-1.8-3-3.7 0-2.1 1.7-3.6 4-3.6 1.6 0 2.9.8 3.5 2.1l-1.4.7c-.4-.9-1.2-1.4-2.1-1.4-1.3 0-2.3.9-2.3 2.1 0 1.2.8 1.9 2.2 2.5l.8.3c2 .9 3.2 2 3.2 4 0 2.2-1.8 3.7-4.1 3.7z" />
  </svg>
);

