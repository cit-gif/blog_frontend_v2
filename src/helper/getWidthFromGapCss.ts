export default function getWidthFromGapCss(classNameFlexGapDefault: string) {
	switch (classNameFlexGapDefault) {
		case 'gap-2':
			return `md:w-[calc(50%-0.25rem)]`;
		case 'gap-4':
			return `md:w-[calc(50%-0.5rem)]`;
		case 'gap-6':
			return `md:w-[calc(50%-1rem)]`;
		default:
			return `md:w-[calc(50%-0.5rem)]`;
	}
}
