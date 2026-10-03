/** Structured data (schema.org JSON-LD) that tells search engines and AI what a page is about. */
export function JsonLd({ data }: { data: object }) {
  // "<" is escaped so no text in the data can close the script tag.
  return <script dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} type="application/ld+json" />;
}
