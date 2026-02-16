import HeroSection from './sections/HeroSection';
import JobsSection from './sections/JobsSection';
import RecommendedJobsSection from './sections/RecommendedJobsSection';
import FeaturedCompaniesSection from './sections/FeaturedCompaniesSection ';
import CategorySection from './sections/CategorySection';

const Home = () => {
	return (
		<>
			<HeroSection />
			<CategorySection />
			<JobsSection />
			<FeaturedCompaniesSection />
			<RecommendedJobsSection />
		</>
	);
};

export default Home;
