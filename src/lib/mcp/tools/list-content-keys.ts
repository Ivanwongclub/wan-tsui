import { defineTool } from '@lovable.dev/mcp-js';
import { EDITABLE_SECTIONS } from '@/admin/editableFields';

export default defineTool({
  name: 'list_content_keys',
  title: 'List editable content keys',
  description:
    'List every editable website text key, grouped by section, with its human label. Use this to find the key needed by get_site_content and update_site_content.',
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const sections = EDITABLE_SECTIONS.map((section) => ({
      section: section.title,
      fields: section.fields.map((f) => ({ key: f.key, label: f.label })),
    }));
    return {
      content: [{ type: 'text', text: JSON.stringify(sections, null, 2) }],
      structuredContent: { sections },
    };
  },
});
