import React from 'react'

function Card(props) {
    const { event } = props;
  return (
    <div>
        <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md">
            <a href={event.poster} className="link" target='_blank'>
                <img src={event.poster} alt={event.eventName} className="w-full h-[400px] object-cover" />
            </a>
            <div className="p-3 bg-gray-200">
                <h3 className="text-xl mb-2">{event.eventName}</h3>
                <p className="text-sm text-gray-500">{event.venue}</p>
            </div>
        </div>
    </div>
  )
}

export default Card