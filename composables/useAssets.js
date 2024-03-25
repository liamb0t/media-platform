export default function useAssets() {

    const audioLinks = [
        'https://pub-bfdc2a1067614c63bcc20a998d72e3a7.r2.dev/artificial-intelligence-ai-v21-access-denied-1178.mp3',
        'https://pub-bfdc2a1067614c63bcc20a998d72e3a7.r2.dev/black-box-ai-124086.mp3',
        'https://pub-bfdc2a1067614c63bcc20a998d72e3a7.r2.dev/this-minimal-technology-pure-12327.mp3',
        'https://pub-bfdc2a1067614c63bcc20a998d72e3a7.r2.dev/sy-fashion-beats-simulate-11176.mp3',
        'https://pub-bfdc2a1067614c63bcc20a998d72e3a7.r2.dev/street-lamp-ai-195447.mp3',
        'https://pub-bfdc2a1067614c63bcc20a998d72e3a7.r2.dev/future-cyberpunk-agressive-hard-sport-ai-dubstep-179625.mp3',
        'https://pub-bfdc2a1067614c63bcc20a998d72e3a7.r2.dev/robots-ii-ai-video-game-computers-upbeat-dance-instrumental-141568.mp3',
        'https://pub-bfdc2a1067614c63bcc20a998d72e3a7.r2.dev/drive-breakbeat-173062.mp3',
        'https://pub-bfdc2a1067614c63bcc20a998d72e3a7.r2.dev/electric-threads-ai-192129.mp3',
        'https://www.soundjay.com/free-music/sounds/midnight-ride-01a.mp3'
    ]

    const threeDLinks = [
        '/media/3d/3D_Isometric_BEDROOM.glb',
        '/media/3d/bmw_e24_635csi.glb',
        '/media/3d/bmw_e39_free.glb',
        '/media/3d/cute_breakfast.glb',
        '/media/3d/potions.glb',
        '/media/3d/lambo.glb',
        '/media/3d/soulless.glb',
    ]

    async function getImage() {
        const response = await fetch('https://pixabay.com/api/?key=43031433-029941f53faf5840b7cb720a5&q=cyberpunk&image_type=photo', {
            
        });
        const data = await response.json();

        // Randomly select one image from the fetched list.
        const randomIndex = Math.floor(Math.random() * data.hits.length);
        const image = data.hits[randomIndex];
       
        return {
            'fileType': 'image',
            'src': image.largeImageURL
        };
    }

    async function getVideoItem() {

        const response = await fetch('https://pixabay.com/api/videos/?key=43031433-029941f53faf5840b7cb720a5&q=cyberpunk', {
            
        });
        const data = await response.json();

        // Randomly select one video from the fetched list.
        const randomIndex = Math.floor(Math.random() * data.hits.length);
        const video = data.hits[randomIndex];

        return {
            'fileType': 'video',
            'src': video.videos.medium.url
        };
    }

    function getAudioItem() {
        const randomIndex = Math.floor(Math.random() * audioLinks.length);
        const track = audioLinks[randomIndex];
        return {
            'fileType': 'audio',
            'src': track,
            'title': track.split('/').pop(),
        };
    }

    function get3DItem() {
        const randomIndex = Math.floor(Math.random() * threeDLinks.length);
        const tdobject = threeDLinks[randomIndex];
        return {
            'fileType': '3D',
            'src': tdobject,
            'title': tdobject.split('/').pop(),
        };
    }

    async function getAllFiles() {
        let itemsPromises = [];
        for (let i = 0; i < 20; i++) {
            itemsPromises.push(getImage());
            itemsPromises.push(getAudioItem());
            itemsPromises.push(getVideoItem());
            itemsPromises.push(get3DItem());
        }
        // Wait for all Promises to resolve and then return the results.
        return await Promise.all(itemsPromises);
    }

  return getAllFiles()
}