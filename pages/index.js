import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React Meetups"
        />
      </Head>
      <h2>Home Page</h2>
      <MeetupList meetups={props.meetups}></MeetupList>
    </>
  );
}
// This function runs code on the server side not on the client side
export async function getStaticProps() {
  const client = MongoClient.connect(
    "mongodb+srv://laravelujjwal:mJmnXX6cd0DzmKvK@cluster0.zm406wu.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = (await client).db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  (await client).close;

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        description: meetup.description,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return { props: { meetups: MEETUPS }, revalidate: 10 };
// }
