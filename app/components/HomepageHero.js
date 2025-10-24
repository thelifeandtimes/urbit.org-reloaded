import Link from "next/link";
import Image from "next/image";

/**
 * HomepageHero - Full viewport height hero section
 *
 * Displays a hero section with:
 * - Background image
 * - Logo/wordmark
 * - Title and subtitle
 * - Primary CTA button
 * - Secondary CTA button
 * - Tertiary text link
 *
 * Takes up 100vh up to a maximum of 1080px height
 *
 * @param {Object} hero - Hero configuration object with all content
 */
export function HomepageHero({ hero }) {
  if (!hero) return null;

  const {
    backgroundImage,
    logo,
    title,
    subtitle,
    primaryCta,
    secondaryCta,
    tertiaryLink,
    primaryMobileCta,
    secondaryMobileCta,
    tertiaryMobileLink
  } = hero;

  return (
    <section
      className="relative flex items-center min-h-[calc(100vh+55px)] max-h-[1080px] z-0 md:-mt-[55px] md:pt-[55px]"
      {...(backgroundImage && {
        style: {
          backgroundImage: `
            linear-gradient(rgba(256, 256, 256, 0.8), rgba(256, 256, 256, 0.8)), 
            url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }
      })}
    >

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-4 py-16 flex flex-col max-w-4xl">
        {/* Logo */}
        {logo && (
          <div className="mb-12">
            <Image
              src={logo}
              alt="Urbit"
              width={197}
              height={86}
              className="h-16 md:h-20 lg:h-24 w-auto"
              priority
            />
          </div>
        )}

        {/* Title */}
        {title && (
          <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-serif italic mb-12 leading-tight text-gray-87 z-20">
            {title}
          </h1>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p className="relative text-xl md:text-2xl lg:text-3xl text-[#3f3f3f] mb-12 max-w-3xl leading-[130%] z-20">
            {subtitle}
          </p>
        )}

        {/* Mobile CTA Buttons */}
        <div className="md:hidden flex flex-col sm:flex-row gap-4 mb-8">
          {/* Primary Mobile CTA */}
          {primaryMobileCta && (
            <Link
              href={primaryMobileCta.link}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-[600]
                bg-secondary text-primary border-2 border-secondary rounded-lg
                hover:bg-primary hover:text-secondary transition-all transform"
            >
              {primaryMobileCta.label}
            </Link>
          )}

          {/* Secondary Mobile CTA */}
          {secondaryMobileCta && (
            <Link
              href={secondaryMobileCta.link}
              className="font-mono inline-flex items-center justify-center px-8 py-4 text-lg font-[600]
                bg-primary text-secondary border-2 border-secondary rounded-lg
                hover:bg-secondary hover:text-primary transition-all"
            >
              {secondaryMobileCta.label}
            </Link>
          )}
        </div>

        {/* Mobile Tertiary Link */}
        {tertiaryMobileLink && (
          <Link
            href={tertiaryMobileLink.link}
            className="md:hidden text-base text-gray-87 hover:text-white transition-colors underline underline-offset-4"
            {...(tertiaryMobileLink.link.startsWith('http') && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
          >
            {tertiaryMobileLink.label}
          </Link>
        )}


        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex flex-col sm:flex-row gap-4 mb-8">
          {/* Primary CTA */}
          {primaryCta && (
            <Link
              href={primaryCta.link}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-[600]
                bg-secondary text-primary border-2 border-secondary rounded-lg
                hover:bg-primary hover:text-secondary transition-all transform"
            >
              {primaryCta.label}
            </Link>
          )}

          {/* Secondary CTA */}
          {secondaryCta && (
            <Link
              href={secondaryCta.link}
              className="font-mono inline-flex items-center justify-center px-8 py-4 text-lg font-[600]
                bg-primary text-secondary border-2 border-secondary rounded-lg
                hover:bg-secondary hover:text-primary transition-all"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>

        {/* Desktop Tertiary Link */}
        {tertiaryLink && (
          <Link
            href={tertiaryLink.link}
            className="hidden md:block text-base text-gray-87 hover:text-white transition-colors underline underline-offset-4"
            {...(tertiaryLink.link.startsWith('http') && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
          >
            {tertiaryLink.label}
          </Link>
        )}
      </div>
    </section>
  );
}
