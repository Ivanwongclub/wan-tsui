import { type OptimizedImage } from '../lib/imageHelpers';
import { type CSSProperties } from 'react';

type Props = {
  image: OptimizedImage;
  alt: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
};

export function Image({ image, alt, className, style, priority = false, onError }: Props) {
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
