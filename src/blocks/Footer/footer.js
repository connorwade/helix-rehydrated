export class Footer {
  constructor(content) {
    this.html = `
            <div class="footer">
                ${content}
            </div>
        `;
  }

  render(node) {
    node.innerHTML = this.html;
  }
}
