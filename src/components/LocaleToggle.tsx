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
      className="border text-brand-body hover:bg-brand-primary-light hover:text-brand-primary hover:border-brand-primary transition-colors"
      style={{
        borderColor: 'var(--color-brand-border, rgba(0,0,0,0.12))',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.12em',
        padding: '6px 10px',
        borderRadius: '4px',
        minWidth: '38px',
        minHeight: '28px',
        lineHeight: 1,
        cursor: 'pointer',
        background: 'transparent',
        fontFamily: 'inherit',
      }}
    >
      {content.ui.locale.toggleToEn}
    </button>
  );
}
