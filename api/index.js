const { WebClient } = require('@slack/web-api');
const axios = require('axios').default;
const images = {
  "morning": "https://images.unsplash.com/photo-1517188206596-1e1f7c954177?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
  "afternoon": "https://images.unsplash.com/photo-1566452348683-91f934cd9051?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
  "night": "https://images.unsplash.com/photo-1519446251021-1c4ee77fec1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=913&q=80"
} 
async function setPFP() {
  var hour = new Date().getHours() + 8
  let image
  if (5 < hour && hour < 12) {
    image = await axios.get(images.morning, {
      responseType: "arraybuffer",
    });
  }
  else if (12 < hour && hour < 20) {
    image = await axios.get(images.afternoon, {
      responseType: "arraybuffer",
    });
  }
  else {
    image = await axios.get(images.night, {
      responseType: "arraybuffer",
    });
  }
  const client = new WebClient();
  const slackRequest = await client.users.setPhoto({
    image: image.data,
    token: process.env.SLACK_TOKEN
  });
}

export default async (req, res) => {
  await setPFP()
  res.send("Started changing your PFP!")
}