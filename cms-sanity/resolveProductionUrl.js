// source
// - https://github.com/vercel/next.js/tree/canary/examples/cms-sanity#step-5-prepare-project-for-previewing
// - https://www.sanity.io/docs/preview-content-on-site

const previewSecret = "LAURAAA_SEE"; // Copy the string you used for SANITY_PREVIEW_SECRET
const projectUrl = "http://localhost:3000";

export default function resolveProductionUrl(document) {
  return `${projectUrl}/api/preview?secret=${previewSecret}&slug=${document.slug.current}`;
}
