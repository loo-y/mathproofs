import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { DemoSection } from '@/components/sections/demo-section';
import { WorkflowSection } from '@/components/sections/workflow-section';
import { CTASection } from '@/components/sections/cta-section';

export default function Home() {
	return (
		<div className="flex flex-col w-full">
			<HeroSection />
			<FeaturesSection />
			<WorkflowSection />
			<DemoSection />
			<CTASection />
		</div>
	);
}
