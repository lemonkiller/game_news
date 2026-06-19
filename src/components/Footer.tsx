import type { UiLang } from "../i18n";
import { FOOTER_TEXT } from "../i18n";

interface FooterProps {
	uiLang: UiLang;
}

export default function Footer({ uiLang }: FooterProps) {
	return (
		<footer className="footer">
			<p>GameDev News - {FOOTER_TEXT[uiLang] || FOOTER_TEXT.en}</p>
		</footer>
	);
}
