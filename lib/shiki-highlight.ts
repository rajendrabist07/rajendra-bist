import { codeToHtml } from 'shiki';

export const IDENTITY_CODE = `const rajendra = {
  role: "Full-Stack Developer",
  location: "New Delhi, India",
  timezone: "Asia/Kolkata (IST)",
  open: true,
  availability: "Available immediately",
  focus: ["Node.js", "TypeScript", "PostgreSQL", "Next.js"],
  workAuth: "India, no sponsorship (Indo-Nepal Treaty)",
} satisfies Engineer;`;

/**
 * Generates highlighted HTML at build time with dual themes.
 * Ships ZERO client JS for syntax highlighting.
 */
export async function getIdentityBlockHtml(): Promise<{ html: string; code: string }> {
  const html = await codeToHtml(IDENTITY_CODE, {
    lang: 'typescript',
    themes: {
      dark: 'github-dark-default',
      light: 'github-light-default',
    },
    defaultColor: false,
  });

  return { html, code: IDENTITY_CODE };
}
