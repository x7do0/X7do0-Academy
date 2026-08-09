export function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function formatInlineCode(value = '') {
  return escapeHtml(value).replace(
    /`([^`]+)`/g,
    '<code class="inline-code" dir="ltr"><bdi>$1</bdi></code>'
  );
}
