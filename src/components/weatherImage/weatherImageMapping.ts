export const weatherImageMapping: {
    [key: (number | string)]: {
        src: string,
        alt: string,
        icon: string,
        credit: string,
        link: string
    }
} = {
    default: {
        src: 'assets/weather/1000-sun.jpg',
        alt: 'Seagull Soaring in a Clear Blue Sky',
        icon: 'sunny',
        credit: 'Lisa from Pexels via Pexels',
        link: 'https://images.pexels.com/photos/30924433/pexels-photo-30924433.jpeg',
    },
    1000: {
        src: 'assets/weather/1000-sun.jpg',
        alt: 'Seagull Soaring in a Clear Blue Sky',
        icon: 'sunny',
        credit: 'Lisa from Pexels via Pexels',
        link: 'https://images.pexels.com/photos/30924433/pexels-photo-30924433.jpeg'

    },
    1003: {
        src: 'assets/weather/1003-partly-cloudy.jpg',
        alt: 'A photo of a sky with clouds and a plane',
        icon: 'partly_cloudy_day',
        credit: 'Fiona Murray via Pexels',
        link: 'https://images.pexels.com/photos/27669187/pexels-photo-27669187.jpeg'
    },
    1006: {
        src: 'assets/weather/1006-cloudy.jpg',
        alt: 'Cloudy sky',
        icon: 'cloud',
        credit: 'Nikhil Dafare via Unsplash',
        link: 'https://images.unsplash.com/photo-1604042403941-398c711e4218?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170',
    },
    1009: {
        src: 'assets/weather/1009-overcast.jpg',
        alt: 'Gray Clouds',
        icon: 'cloud',
        credit: 'Pixabay via Pexels',
        link: 'https://images.pexels.com/photos/414659/pexels-photo-414659.jpeg'
    },
    1030: {
        src: 'assets/weather/1030-mist.jpg',
        alt: 'Photo of Two White Ducks on Water during Fog',
        icon: 'mist',
        credit: 'Karol Wiśniewski via Pexels',
        link: 'https://images.pexels.com/photos/845619/pexels-photo-845619.jpeg'
    },
    1063: {
        src: 'assets/weather/1063-patchy-rain-possible.jpg',
        alt: 'Rainbow, Meteorological phenomenon, Rain image.',
        icon: 'rainy_light',
        credit: 'Kanenori via Pixabay',
        link: 'https://cdn.pixabay.com/photo/2022/08/12/15/40/rainbow-7381976_1280.jpg'
    },
    1066: {
        src: 'assets/weather/1066-patchy-snow-possible.jpg',
        alt: 'Close up photography of snow',
        icon: 'sunny_snowing',
        credit: 'hannah grace via Unsplash',
        link: 'https://images.unsplash.com/photo-1644180670912-f06607f49e0f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
    },
    1069: {
        src: 'assets/weather/1069-patchy-sleet-possible.jpg',
        alt: 'Close up photography of raincoat',
        icon: 'rainy_snow',
        credit: 'Claudio Schwarz via Unsplash',
        link: 'https://images.pexels.com/photos/30934884/pexels-photo-30934884.jpeg'
    },
    1072: {
        src: 'assets/weather/1072-patchy-freezing-drizzle-possible.jpg',
        alt: 'people walking on street during night time',
        icon: 'rainy_snow',
        credit: 'Dasha Zhytanska via Unsplash',
        link: 'https://images.unsplash.com/photo-1611506966382-e14375b75587?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1175'
    },
    1087: {
        src: 'assets/weather/1087-thundery-outbreaks-possible.jpg',
        alt: 'Dramatic Storm Clouds Filling the Sky',
        icon: 'thunderstorm',
        credit: 'Enrique via Pexels',
        link: 'https://images.pexels.com/photos/32637594/pexels-photo-32637594.jpeg'
    },
    1114: {
        src: 'assets/weather/1114-blowing-snow.jpg',
        alt: 'Withered trees',
        icon: 'snowing',
        credit: 'Craig Tidball via Unsplash',
        link: 'https://images.unsplash.com/photo-1517019043294-427e1726fac4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1032'
    },
    1117: {
        src: 'assets/weather/1117-blizzard.jpg',
        alt: 'Black and Gray Mountain Ruins',
        icon: 'snowing_heavy',
        credit: 'eberhard grossgasteiger via Pexels',
        link: 'https://images.pexels.com/photos/691581/pexels-photo-691581.jpeg'
    },
    1135: {
        src: 'assets/weather/1135-fog.jpg',
        alt: 'A mostly-empty highway shrouded in fog.',
        icon: 'foggy',
        credit: 'Markus Spiske via Pexels',
        link: 'https://images.pexels.com/photos/226460/pexels-photo-226460.jpeg'
    },
    1147: {
        src: 'assets/weather/1147-freezing-fog.jpg',
        alt: 'Train tracks in the fog and snow.',
        icon: 'foggy',
        credit: 'Anton Atanasov via Pexels',
        link: 'https://images.pexels.com/photos/210782/pexels-photo-210782.jpeg'
    },
    1150: {
        src: 'assets/weather/1150-patchy-light-drizzle.jpg',
        alt: 'Water droplets on clear umbrella',
        icon: 'rainy_light',
        credit: 'Kittitep Khotchalee via Unsplash',
        link: 'https://images.unsplash.com/photo-1625520074724-dfe035d40e30?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
    },
    1153: {
        src: 'assets/weather/1153-light-drizzle.jpg',
        alt: 'Rainy Weather With Trees',
        icon: 'rainy_light',
        credit: 'Yash Dengre via Pexels',
        link: 'https://images.pexels.com/photos/725876/pexels-photo-725876.jpeg'
    },
    1168: {
        src: 'assets/weather/1168-freezing-drizzle.jpg',
        alt: 'Water Droplets On Glass Window',
        icon: 'rainy_snow',
        credit: 'Viktor Mogilat via Pexels',
        link: 'https://images.pexels.com/photos/3979060/pexels-photo-3979060.jpeg'
    },
    1171: {
        src: 'assets/weather/1171-heavy-freezing-drizzle.jpg',
        alt: 'Lonely Figure Walking in Snowstorm by Pier',
        icon: 'rainy_snow',
        credit: 'Soner Arkan via Pexels',
        link: 'https://images.pexels.com/photos/30910419/pexels-photo-30910419.jpeg'
    },
    1180: {
        src: 'assets/weather/1180-patchy-light-rain.jpg',
        alt: 'A field with trees and clouds in the background',
        icon: 'rainy_light',
        credit: 'Jon Sailer via Unsplash',
        link: 'https://images.unsplash.com/photo-1683729220582-b8903d7fa3b0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172'
    },
    1183: {
        src: 'assets/weather/1183-light-rain.jpg',
        alt: 'Dog Dressed in Jacket',
        icon: 'rainy_light',
        credit: 'Andreas Schnabl via Unsplash',
        link: 'https://images.pexels.com/photos/19321355/pexels-photo-19321355.jpeg'
    },
    1186: {
        src: 'assets/weather/1186-moderate-rain-at-times.jpg',
        alt: 'Cars Parked on the Street',
        icon: 'rainy',
        credit: 'Volker Thimm via Pexels',
        link: 'https://images.pexels.com/photos/13554138/pexels-photo-13554138.jpeg'
    },
    1189: {
        src: 'assets/weather/1189-moderate-rain.jpg',
        alt: 'Puddle, Rain, Raindrops image.',
        icon: 'rainy',
        credit: 'Pexels via Pixabay',
        link: 'https://pixabay.com/static/frontend/3623f49a093c354a.svg'
    },
    1192: {
        src: 'assets/weather/1192-heavy-rain-at-times.jpg',
        alt: 'Paper boat on body of water',
        icon: 'rainy_heavy',
        credit: 'Mitodru Ghosh via Unsplash',
        link: 'https://images.unsplash.com/photo-1532928448850-d740ccdd9f9c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
    },
    1195: {
        src: 'assets/weather/1195-heavy-rain.jpg',
        alt: 'Dew drops on glass panel',
        icon: 'rainy_heavy',
        credit: 'Valentin Müller via Unsplash',
        link: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1335'
    },
    1198: {
        src: 'assets/weather/1198-light-freezing-rain.jpg',
        alt: 'Freezing rain on a red car.',
        icon: 'rainy_snow',
        credit: 'benjamin lehman via Unsplash',
        link: 'https://images.unsplash.com/photo-1742563212503-9f44dada3f69?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
    },
    1201: {
        src: 'assets/weather/1201-moderate-or-heavy-freezing-rain.jpg',
        alt: 'A Moving Cars on the Road During Winter Weather',
        icon: 'rainy_snow',
        credit: 'Josh Hild via Pexels',
        link: 'https://images.pexels.com/photos/6331702/pexels-photo-6331702.jpeg'
    },
    1204: {
        src: 'assets/weather/1204-light-sleet.jpg',
        alt: 'Grayscale Photography of Woman Walking Upstairs',
        icon: 'rainy_snow',
        credit: 'Ahmed Hariry Mahmoud via Pexels',
        link: 'https://images.pexels.com/photos/3455391/pexels-photo-3455391.jpeg'
    },
    1207: {
        src: 'assets/weather/1207-moderate-or-heavy-sleet.jpg',
        alt: 'Person Standing in Front of a Train',
        icon: 'rainy_snow',
        credit: 'Josh Hild via Pexels',
        link: 'https://images.pexels.com/photos/2422497/pexels-photo-2422497.jpeg'
    },
    1210: {
        src: 'assets/weather/1210-patchy-light-snow.jpg',
        alt: 'Snowfall',
        icon: 'snowing',
        credit: 'kristamonique via Pixabay',
        link: 'https://cdn.pixabay.com/photo/2013/10/27/17/14/snowfall-201496_1280.jpg'
    },
    1213: {
        src: 'assets/weather/1213-light-snow.jpg',
        alt: 'Footprints, Snow, Winter image.',
        icon: 'snowing',
        credit: 'wal_172619_II via Pixabay',
        link: 'https://images.pexels.com/photos/953626/pexels-photo-953626.jpeg'
    },
    1216: {
        src: 'assets/weather/1216-patchy-moderate-snow.jpg',
        alt: 'Old Riga',
        icon: 'snowing',
        credit: 'Efrem Efre via Pexels',
        link: 'https://images.pexels.com/photos/20714231/pexels-photo-20714231.jpeg'
    },
    1219: {
        src: 'assets/weather/1219-moderate-snow.jpg',
        alt: 'Snow, Cold, Winter image.',
        icon: 'snowing',
        credit: 'wisconsinpictures via Pixabay',
        link: 'https://images.pexels.com/photos/6833769/pexels-photo-6833769.jpeg'
    },
    1222: {
        src: 'assets/weather/1222-patchy-heavy-snow.jpg',
        alt: 'Pine Trees Covered in Snow',
        icon: 'snowing_heavy',
        credit: 'Siegfried Poepperl via Pexels',
        link: 'https://images.pexels.com/photos/7471528/pexels-photo-7471528.jpeg'
    },
    1225: {
        src: 'assets/weather/1225-heavy-snow.jpg',
        alt: 'Forest Trees Covered in Snow',
        icon: 'snowing_heavy',
        credit: 'eberhard grossgasteiger via Pexels',
        link: 'https://images.pexels.com/photos/19780238/pexels-photo-19780238.jpeg'
    },
    1237: {
        src: 'assets/weather/1237-ice-pellets.jpg',
        alt: 'Hailstones on window pane, April weather, Hail image.',
        icon: 'weather_hail',
        credit: 'ASSY via Pixabay',
        link: 'https://cdn.pixabay.com/photo/2016/04/26/10/18/hailstones-on-window-pane-1354038_1280.jpg'
    },
    1240: {
        src: 'assets/weather/1240-light-rain-shower.jpg',
        alt: 'Close-Up Photography of Droplets On Glass',
        icon: 'rainy_light',
        credit: 'Kristya Nugraha via Pexels',
        link: 'https://images.pexels.com/photos/1413100/pexels-photo-1413100.jpeg'
    },
    1243: {
        src: 'assets/weather/1243-moderate-or-heavy-rain-shower.jpg',
        alt: 'Rainy night city lights',
        icon: 'rainy_heavy',
        credit: 'Vasily Kleymenov via Pexels',
        link: 'https://images.pexels.com/photos/27402577/pexels-photo-27402577.jpeg'
    },
    1246: {
        src: 'assets/weather/1246-torrential-rain-shower.jpg',
        alt: 'Raindrops',
        icon: 'rainy_heavy',
        credit: 'Vlad Chețan via Pexels',
        link: 'https://images.pexels.com/photos/1529360/pexels-photo-1529360.jpeg'
    },
    1249: {
        src: 'assets/weather/1249-light-sleet-showers.jpg',
        alt: 'Landscape photograph of 101 building',
        icon: 'rainy_snow',
        credit: 'Wes Hicks via Unsplash',
        link: 'https://images.unsplash.com/photo-1518010422335-17de5dac1223?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
    },
    1252: {
        src: 'assets/weather/1252-moderate-or-heavy-sleet-showers.jpg',
        alt: 'Couple walking on train station',
        icon: 'rainy_snow',
        credit: 'Osman Rana via Unsplash',
        link: 'https://images.unsplash.com/photo-1519692958672-ee66611a9f40?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
    },
    1255: {
        src: 'assets/weather/1255-light-snow-showers.jpg',
        alt: 'A snowy street at night with a person walking on the sidewalk',
        icon: 'snowing',
        credit: 'Tsuyoshi Kozu via Unsplash',
        link: 'https://images.unsplash.com/photo-1708505090662-f2b5d7a7d06f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
    },
    1258: {
        src: 'assets/weather/1258-moderate-or-heavy-snow-showers.jpg',
        alt: 'Photography of Leafless Tree Surrounded by Snow',
        icon: 'snowing_heavy',
        credit: 'Jeffrey Czum via Pexels',
        link: 'https://images.pexels.com/photos/774531/pexels-photo-774531.jpeg'
    },
    1261: {
        src: 'assets/weather/1261-light-showers-of-ice-pellets.jpg',
        alt: 'Brown Wooden Board',
        icon: 'weather_hail',
        credit: 'Stefan Stefancik via Pexels',
        link: 'https://images.pexels.com/photos/42160/pexels-photo-42160.jpeg'
    },
    1264: {
        src: 'assets/weather/1264-moderate-or-heavy-showers-of-ice-pellets.jpg',
        alt: 'Hail Balls After Heavy Rain Lying on Ice',
        icon: 'weather_hail',
        credit: 'Julia Filirovska via Pexels',
        link: 'https://images.pexels.com/photos/8237250/pexels-photo-8237250.jpeg'
    },
    1273: {
        src: 'assets/weather/1273-patchy-light-rain-with-thunder.jpg',
        alt: 'Lightning Strike',
        icon: 'thunderstorm',
        credit: 'Frank Cone via Pexels',
        link: 'https://images.pexels.com/photos/2289940/pexels-photo-2289940.jpeg'
    },
    1276: {
        src: 'assets/weather/1276-moderate-or-heavy-rain-with-thunder.jpg',
        alt: 'Cumulus clouds and lightning',
        icon: 'thunderstorm',
        credit: 'Levi Guzman via Unsplash',
        link: 'https://images.unsplash.com/photo-1538169204832-1b461add30a5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170'
    },
    1279: {
        src: 'assets/weather/1279-patchy-light-snow-with-thunder.jpg',
        alt: 'Mountain alps under stratocumulus clouds',
        icon: 'thunderstorm',
        credit: 'Nathan Anderson via Unsplash',
        link: 'https://images.unsplash.com/photo-1471923373921-461fdb6de4e5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1192'
    },
    1282: {
        src: 'assets/weather/1282-moderate-or-heavy-snow-with-thunder.jpg',
        alt: 'A lightning strikes in the sky over a mountain range',
        icon: 'thunderstorm',
        credit: 'Marek Piwnicki via Unsplash',
        link: 'https://images.unsplash.com/photo-1652982645764-f087a6b491bc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=928'
    },
}
