//below are just a sample, to use it for your testcase
// you can parmetrised it based on your need


exports.env = {
  envTorun:   'stageEnv1', // either stageEnv1 or stageEnv2  or qaEnv   or prodEnv

  stageEnv1:    {url:'https://yourstageEnv1.com/signin.html', username: 'test123', password: '1234'},
  stageEnv2:    {url:'https://yourstageEnv2.com/signin.html', username: 'test123', password: '1234'},
  qaEnv:        {url:'https://yourqaEnv.com/signin.html', username: 'test123', password: '1234'},
  prodEnv:      {url:'https://prodEnv/signin.html', username: 'produser1', password: 'test1234'},

};
