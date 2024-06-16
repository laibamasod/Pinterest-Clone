import Image from 'next/image'
import React from 'react'

function PinImage({pinDetail}) {
    const handleDownload = () => {
        fetch(pinDetail.image) // Fetch the image URL
          .then(response => response.blob()) // Convert response to Blob
          .then(blob => {
            const url = URL.createObjectURL(blob); // Create a blob URL
            const link = document.createElement('a');
            link.href = url;
            link.download = pinDetail.title || 'image'; // Set default filename
            link.click(); // Trigger download
            URL.revokeObjectURL(url); // Clean up the blob URL after download
          })
          .catch(error => console.error('Error downloading image:', error));
      };
  return (
    <>
    <div>
      <Image src={pinDetail.image}
      alt={pinDetail.title}
      width={1000}
      height={1000}
    
      className='rounded-2xl'
      />
    </div>
    {/* <button
        className="absolute top-2 right-2 bg-gray-200 p-2 rounded-full font-semibold hover:bg-gray-300"
        onClick={handleDownload}
      >
        Download
      </button> */}
    </>
  )
}

export default PinImage