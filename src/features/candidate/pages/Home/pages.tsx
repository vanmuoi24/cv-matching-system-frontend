import HeroSection from './sections/HeroSection';
import JobsSection from './sections/JobsSection';
import RecommendedJobsSection from './sections/RecommendedJobsSection';
import FeaturedCompaniesSection from './sections/FeaturedCompaniesSection ';

const Home = () => {
	return (
		<>
			<HeroSection />
			{/* <CategorySection /> */}
			<JobsSection />
			<FeaturedCompaniesSection />
			<RecommendedJobsSection />
			{/* <BlogSection /> */}
			{/* <SupportHotlineSection /> */}
		</>
	);
};

export default Home;
