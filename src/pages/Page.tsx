import { IonList, IonButton, IonItem, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import './Page.css';
import axios from 'axios';

const  API_KEY  =  "YOUR-API-KEY";
const  URL  =  `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`;

const fetchArticles = () => {
  return axios({
    url: URL,
    method: 'get'
  })
  .then(response => {
    console.log(response);
    return response.data;
  })
};



const Page: React.FC<RouteComponentProps<{ name: string; }>> = ({ match }) => {
  const [articles, setArticles] = React.useState([]);
//    const items: any[] = [];
    React.useEffect(() => {

        fetchArticles().then(data => setArticles(data.articles));

    }, []);
  return (
    <IonPage>
      <IonHeader >
        <IonToolbar color="dark">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{match.params.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList color="primary">
          {
            articles.map((a, index) => {
              return (
                <IonItem key={index}>
                  {a['title']}
                    <IonButton 
                      href={a['url']} 
                      color="secondary" 
                      slot="end"
                    >
                      Read
                    </IonButton>
                </IonItem>
              );
            })
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Page;
