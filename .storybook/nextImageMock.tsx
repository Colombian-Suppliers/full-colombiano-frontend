import React from 'react';

// Mock Next.js Image component for Storybook
export default function Image({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  loading,
  className,
  style,
  sizes,
  quality,
  placeholder,
  onLoad,
  onError,
  ...props
}: any) {
  // If it's a fill image, use object-fit
  if (fill) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          inset: 0,
          objectFit: 'cover',
          color: 'transparent',
          ...style,
        }}
        loading={priority ? 'eager' : loading || 'lazy'}
        onLoad={onLoad}
        onError={onError}
        {...props}
      />
    );
  }

  // Regular image with width/height
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      loading={priority ? 'eager' : loading || 'lazy'}
      onLoad={onLoad}
      onError={onError}
      {...props}
    />
  );
}

