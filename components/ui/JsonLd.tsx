/**
 * Renders a JSON-LD <script> block for structured data (SEO schema).
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inject here.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
