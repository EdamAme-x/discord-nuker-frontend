import { Footer } from "./footer";
import { Header } from "./header";

export function Layout({
	children,
	config
}: {
	children: React.ReactNode;
	config: null | {
		header: boolean;
		footer: boolean;
	};
}) {
	if (config === null) {
		config = { header: true, footer: true };
	}

	return (
		<div className="w-full min-h-screen">
			<div>{config.header && <Header />}</div>
			<div className="min-h-screen">{children}</div>
			<div>{config.footer && <Footer />}</div>
		</div>
	);
}
