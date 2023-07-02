import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/dist/next-server/lib/head";
export default function NewMeetup() {
  const router = useRouter();
  async function addMeetuptHandler(enteredMeetupData) {
    const res = await fetch("/api/meetup/new", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Add new Meetup</title>
        <meta name="description" content="Add your own meetup" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetuptHandler} />
    </>
  );
}
