import request from 'superagent';

export function initSchedules() {
  request
      .get('/api/workSchedules')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log("Request errors:")
          console.log(err, res);
        } else {
          console.log(res);
          this.setState({users: res.body});
        }
      });
}

