export class Header {
  constructor(content) {
    this.html = `
              <nav class="header">
                  ${content}
              </nav>
          `;
  }

  render(node) {
    node.innerHTML = this.html;
  }
}
