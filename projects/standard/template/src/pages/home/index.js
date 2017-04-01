import './index.less';
import '../../lib/common';

const mainNode = document.createElement('div');
mainNode.setAttribute('class', 'main');
mainNode.innerHTML = `
  Congratulations!
  You's running the project successfully.
  Enjoy Coding!
`;

document.body.appendChild(mainNode);