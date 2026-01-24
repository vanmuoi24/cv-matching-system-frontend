import HeroBannerSection from './sections/HeroBannerSection';
import InfoSection from './sections/InfoSection';
import NewFeaturesSection from './sections/NewFeaturesSection';
import CustomerSection from './sections/CustomerSection';
import SupportHotlineSection from './sections/SupportHotlineSection';
import ContactFormSection from './sections/ContactFormSection';
const Home = () => {
	return (
		<div>
			<HeroBannerSection />
			<InfoSection />
			<NewFeaturesSection />
			<CustomerSection />
			<ContactFormSection />
			<SupportHotlineSection />
		</div>
	);
};

export default Home;
