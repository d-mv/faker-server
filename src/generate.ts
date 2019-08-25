import faker from 'faker';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const APIKEY = process.env.UIFACES_API_KEY;

axios.defaults.headers.common['X-API-KEY'] = APIKEY;

interface UIFace {
  name: string;
  email: string;
  position: string;
  photo: string;
}

export const generate = async (qty?: number) => {
  try {
    const response = await axios.get(
      `https://uifaces.co/api?limit=${2}&emotion[]=happiness`
    );
    const person: UIFace[] = response.data;

    let obj = [];
    for (let i = 0; i < (qty || 1); i++) {
      const toId = Math.random() >= 0.5 ? 1 : faker.random.number();
      const newObject = {
        id: faker.random.number(),
        isSeen: true,
        createdAt: faker.date.past(1, new Date()),
        from: {
          // if to: is not user, then user is the sender
          id: toId === 1 ? faker.random.number() : 1,
          avatar: person[toId === 1 ? 1 : 0].photo,
          title: person[toId === 1 ? 1 : 0].name,
          subTitle: person[toId === 1 ? 1 : 0].position
        },
        to: toId,
        text: faker.lorem.lines(1)
      };
      obj.push(newObject);
    }

    return obj;
  } catch (e) {
    console.log(e);
  }
};
