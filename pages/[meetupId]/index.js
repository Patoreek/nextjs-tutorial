// import { Fragment } from 'react';
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import Head from 'next/head';
import { Fragment } from 'react'
function MeetupDetails(props){
    return (
        <Fragment>
        <Head>
            <title>{props.meetupData.title}</title>
            <meta name="description" content={props.meetupData.description}/>
        </Head>
       <MeetupDetail
            image={props.meetupData.image}
            alt={props.meetupData.alt}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
       />
       </Fragment>
    )
}
export async function getStaticPaths() {

    const client = await MongoClient.connect('mongodb+srv://' + process.env.MONGO_DB_USER + ':' + process.env.MONGO_DB_PW + '@nextjs-tutorial-cluster.lzr6l.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();
    client.close();
    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: {
                meetupId: meetup._id.toString()
            }
        }))
    }
}

export async function getStaticProps(context) {
    // fetch data fora single meetup
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://' + process.env.MONGO_DB_USER + ':' + process.env.MONGO_DB_PW + '@nextjs-tutorial-cluster.lzr6l.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)});
    client.close();

    console.log(meetupId);
    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        },
        // revalidate: 10
    };
}


export default MeetupDetails;