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
        '_nuxt/assets/media/3d/3D_Isometric_BEDROOM.glb',
        '_nuxt/assets/media/3d/bmw_e24_635csi.glb',
        '_nuxt/assets/media/3d/bmw_e39_free.glb',
        '_nuxt/assets/media/3d/cute_breakfast.glb',
        '_nuxt/assets/media/3d/potions.glb',
        
    ]

    function getImage() {
        let size = Math.random() * 3 + 1;
        let width = Math.random() * 110 + 100;
        width = Math.round(width * size);
        let height = Math.round(140 * size);
        let src = `https://picsum.photos/${width}/${height}`;
        return {
            'fileType': 'image',
            'src': src
        };
    }

    async function getVideoItem() {
        // Use the API to fetch a list of videos. This is a pseudo-code example.
        const response = await fetch('https://api.pexels.com/videos/search?query=animation&per_page=10', {
            headers: {
            Authorization: 'nhxZiVRJeRwzuqRkRfPYBZx84HJMDmUkaOmpyvdf0zjvzR0lsu0o1IJc'
            }
        });
        const data = await response.json();
        // Randomly select one video from the fetched list.
        const randomIndex = Math.floor(Math.random() * data.videos.length);
        const video = data.videos[randomIndex];
        return {
            'fileType': 'video',
            'src': video.video_files[0].link // Selecting the first video link. Adjust as needed.
        };
    }

    function getAudioItem() {
        // Use the API to fetch a list of videos. This is a pseudo-code example.
        const randomIndex = Math.floor(Math.random() * audioLinks.length);
        const track = audioLinks[randomIndex];
        return {
            'fileType': 'audio',
            'src': track,
            'title': track.split('/').pop(),
        };
    }

    function get3DItem() {
        // Use the API to fetch a list of videos. This is a pseudo-code example.
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