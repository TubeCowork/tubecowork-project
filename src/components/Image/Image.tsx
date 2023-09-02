type ImageProps = {
    src: string
    alt: string
    className: string
}

const Image: React.FC<ImageProps> = ({ src, alt, className }) => {
    return <img src={src} className={className} alt={alt} />
}

export default Image
