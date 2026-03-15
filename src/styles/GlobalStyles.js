import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* ================= RESET ================= */
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* ================= ROOT TOKENS ================= */
  :root {
    --color-text: #0c1d36;
    --bg-start: #f0ecff;
    --bg-end: rgba(95, 116, 201, 0.8);
    --surface: rgba(255, 255, 255, 0.82);
    --surface-soft: rgba(255, 255, 255, 0.65);
    --border-soft: rgba(99, 102, 241, 0.18);

    --text-primary: #1E293B;
    --text-secondary: #475569;

    --primary: #4F46E5;
    --primary-hover: #4338CA;
    --accent: #2563EB;

    --highlight: #FACC15;
  }

  /* ================= BASE ================= */
  html {
    font-size: 62.5%; /* 1rem = 10px */
  }


  body {
    padding-top: 1rem;
    font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    color: var(--color-text);
    min-height: 100vh;
    background: linear-gradient(
                135deg,
                #f8fafc 0%,   /* slate-50 */
                #f1f5f9 100%  /* slate-100 */
              );
    max-height: 200vh;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  @media (max-width: 1245px) {
    html {
      font-size: 56.25%; /* 9px */
    }
  }

  @media (max-width: 670px) {
    html {
      font-size: 37.5%; /* 9px */
    }
  }

  @media (max-width: 420px) {
    html {
      font-size: 28.25%; /* 9px */
    }
  }

`;

 



export default GlobalStyles;



// import { createGlobalStyle } from "styled-components";

// const GlobalStyles = createGlobalStyle`:root
//     /* Global reset */
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }

//   html {
//     font-size: 62.5%; /* 1rem = 10px */
//      }
 
//   body {
//       font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
//       color: var(--color-text);
//       background: linear-gradient(
//                 180deg,
//                 #F0ECFF 0%,
//                 rgba(95, 116, 201, 0.8) 100%
//               );
//     }
// `
// export default GlobalStyles;