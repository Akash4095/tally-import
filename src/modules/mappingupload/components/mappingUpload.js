import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Container, Header, Grid, Dimmer, Loader, Segment, Icon, } from 'semantic-ui-react';
import { TALLY_URL } from '../../../store/path'
import userACL from '../../../store/access';
import { merge } from 'lodash';
import DragDrop from './dragDrop';


const MappingUpload = (props) => {


  const [selectFileMsg, setSelectFileMsg] = useState('');
  const [isWaiting, setWaiting] = useState(false);
  let data = merge({}, userACL.atFetch())



  return (
    <Container >
      <Grid columns='equal'>
        <Grid.Row verticalAlign='middle'>
          <Grid.Column width={5}>
          </Grid.Column>
          <Grid.Column width={6}>
            <br /><br />
            <Segment placeholder padded='very' color="blue" raised >
              <Header icon>
                <Icon name='file outline' color='green' />
                <br />
                {selectFileMsg}
              </Header>
              <br />
              <DragDrop
                setWaiting={setWaiting}
                setSelectFileMsg={setSelectFileMsg}
                setDisplayStatus={props.setDisplayStatus}
                setFileUploaded={props.setFileUploaded}
              />
              <br />
              <br />
              <br />


              {isWaiting
                ? <Dimmer active inverted> <Loader indeterminate>Processing File</Loader> </Dimmer>
                : null
              }

            </Segment>
          </Grid.Column>
          <Grid.Column width={5}>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
};

export default MappingUpload;