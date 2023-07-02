import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/dist/next-server/lib/head";
export default function MeetupDetails(props) {
  console.log(props);
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        title={props.meetupData.title}
        description={props.meetupData.description}
        src={props.meetupData.image}
        alt={props.meetupData.title}
        address={props.meetupData.address}
      />
    </>
  );
}
export async function getStaticPaths() {
  const client = MongoClient.connect(
    "mongodb+srv://laravelujjwal:mJmnXX6cd0DzmKvK@cluster0.zm406wu.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = (await client).db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  (await client).close();

  return {
    fallback: true,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = MongoClient.connect(
    "mongodb+srv://laravelujjwal:mJmnXX6cd0DzmKvK@cluster0.zm406wu.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = (await client).db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  console.log(selectedMeetup);
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
