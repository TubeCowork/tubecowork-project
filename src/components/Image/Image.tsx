type ImageProps = {
    src: string
    alt: string
    className: string
}

const CustomImage: React.FC<ImageProps> = ({ src, alt, className }) => {
    return <img src={src} className={className} alt={alt} />
}

export default Image
