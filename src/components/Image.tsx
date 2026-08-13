import { type OptimizedImage } from '../lib/imageHelpers';
import { type CSSProperties } from 'react';
import { useOverrides } from '../hooks/useOverrides';

type Props = {
  image: OptimizedImage;
  alt: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  slotKey?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
};

export function Image({ image, alt, className, style, priority = false, slotKey, onError }: Props) {
  const { images } = useOverrides();
  const overrideUrl = slotKey
    ? images.find((row) => row.key === slotKey)?.url ?? null
    : null;

  if (typeof overrideUrl === 'string' && overrideUrl !== '') {
    return (
      <img
        src={overrideUrl}
        alt={alt}
        width={image.width}
        height={image.height}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onError={(e) => {
          const el = e.target as HTMLImageElement;
          if (el.src !== image.src) {
            el.src = image.src;
            return;
          }
          onError?.(e);
        }}
        style={{
          backgroundImage: `url(${image.lqip})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          ...style,
        }}
      />
    );
  }

  return (
    <picture>
      <source type="image/webp" srcSet={image.srcSetWebp} sizes={image.sizes} />
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={image.sizes}
        alt={alt}
        width={image.width}
        height={image.height}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onError={onError}
        style={{
          backgroundImage: `url(${image.lqip})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          ...style,
        }}
      />
    </picture>
  );
}
