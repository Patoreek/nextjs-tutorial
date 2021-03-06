import Image from 'next/image'
import classes from './MeetupDetail.module.scss';

function MeetupDetail(props){
    return (
        <section className={classes.detail}>
            <img
                src={props.image}
                alt={props.alt}
                width={500}
                height={500}
            />
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>            
        </section>
    )
}

export default MeetupDetail;