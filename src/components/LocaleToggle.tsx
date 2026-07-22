import { useI18n } from '../hooks/useI18n';
import { useContent } from '../hooks/useContent';

export function LocaleToggle() {
  const { toggle } = useI18n();
  const content = useContent();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={content.ui.locale.toggleAriaLabel}
      className="border border-brand-border text-brand-body hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-colors"
      style={{
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.1em',
        padding: '5px 10px',
        borderRadius: '4px',
        minWidth: '36px',
        lineHeight: 1,
        cursor: 'pointer',
      }}
    >
      {content.ui.locale.toggleToEn}
    </button>
  );
}
