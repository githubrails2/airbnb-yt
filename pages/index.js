import Head from "next/head";
import {
	Header,
	Banner,
	SmallCard,
	MediumCard,
  LargeCard,
  Footer
} from "../components";

export default function Home({ exploreData, cardsData }) {
	return (
		<div className="">
			<Head>
				<title>Airbnb Clone</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />
			<Banner />
			<main className="max-w-7xl mx-auto px-8 sm:px-16">
				<section className="pt-6">
					<h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
					{/**API endpoints SSR */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{exploreData?.map((item) => (
							<SmallCard
								key={item.img}
								img={item.img}
								distance={item.distance}
								location={item.location}
							/>
						))}
					</div>
				</section>
				<section>
					<h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
					<div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 ">
						{cardsData?.map((item) => (
							<MediumCard key={item.img} img={item.img} title={item.title} />
						))}
					</div>
				</section>
				<LargeCard
					img="https://links.papareact.com/4cj"
					title="The Greatest OutDoors"
					description="WishLists curated by Airbnb."
					buttonText="Get Inspired"
				/>
      </main>
      <Footer />
		</div>
	);
}
export async function getStaticProps() {
	const exploreData = await fetch("https://links.papareact.com/pyp")
		.then((res) => res.json())
		.catch((error) => console.log(error));
	const cardsData = await fetch("https://links.papareact.com/zp1")
		.then((res) => res.json())
		.catch((err) => console.log(err));
	return {
		props: {
			exploreData,
			cardsData,
		},
	};
}