import { Modal, Toast } from 'bootstrap';

export function initProductForm() {
  const form = document.querySelector('#productForm');
  const table = document.querySelector('#productTable');
  const modalElement = document.querySelector('#productModal');
  const toastElement = document.querySelector('#appToast');
  const toastMessage = document.querySelector('#toastMessage');
  const searchInput = document.querySelector('#searchInput');

  if (!form || !table || !modalElement || !toastElement) return;

  const modal = Modal.getOrCreateInstance(modalElement);
  const toast = Toast.getOrCreateInstance(toastElement);
  let nextId = table.querySelectorAll('tr').length + 1;

  function getStatus(stock) {
    if (stock === 0) return { key: 'agotado', label: 'Agotado' };
    if (stock <= 5) return { key: 'bajo', label: 'Stock bajo' };
    return { key: 'disponible', label: 'Disponible' };
  }

  function updateStats() {
    const rows = [...table.querySelectorAll('tr')];
    let units = 0;
    let low = 0;
    let out = 0;

    rows.forEach((row) => {
      const stock = Number(row.dataset.stock || 0);
      units += stock;
      if (stock > 0 && stock <= 5) low += 1;
      if (stock === 0) out += 1;
    });

    document.querySelector('#totalProducts').textContent = rows.length;
    document.querySelector('#totalUnits').textContent = units;
    document.querySelector('#lowStock').textContent = low;
    document.querySelector('#outOfStock').textContent = out;
    filterProducts();
  }

  function filterProducts() {
    const query = searchInput.value.trim().toLocaleLowerCase('es');
    const rows = [...table.querySelectorAll('tr')];
    let visible = 0;

    rows.forEach((row) => {
      const matches = row.textContent.toLocaleLowerCase('es').includes(query);
      row.classList.toggle('d-none', !matches);
      if (matches) visible += 1;
    });

    document.querySelector('#visibleCount').textContent =
      `${visible} ${visible === 1 ? 'producto' : 'productos'}`;

    document.querySelector('#emptyState').classList.toggle('d-none', visible !== 0);
  }

  searchInput.addEventListener('input', filterProducts);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const name = document.querySelector('#productName').value.trim();
    const category = document.querySelector('#productCategory').value;
    const stock = Number(document.querySelector('#productStock').value);

    if (!name || !category || !Number.isInteger(stock) || stock < 0 || stock > 99999) {
      form.classList.add('was-validated');
      return;
    }

    const status = getStatus(stock);
    const code = `PR-${String(nextId).padStart(3, '0')}`;

    const row = document.createElement('tr');
    row.dataset.name = name;
    row.dataset.category = category;
    row.dataset.stock = String(stock);

    const codeCell = document.createElement('td');
    codeCell.className = 'product-code';
    codeCell.textContent = code;

    const nameCell = document.createElement('td');
    const nameStrong = document.createElement('strong');
    nameStrong.textContent = name;
    const description = document.createElement('small');
    description.textContent = 'Producto registrado';
    nameCell.append(nameStrong, description);

    const categoryCell = document.createElement('td');
    categoryCell.className = 'd-none d-md-table-cell';
    categoryCell.textContent = category;

    const stockCell = document.createElement('td');
    stockCell.textContent = String(stock);

    const statusCell = document.createElement('td');
    const badge = document.createElement('span');
    badge.className = `status-badge status-badge--${status.key}`;
    badge.textContent = status.label;
    statusCell.append(badge);

    row.append(codeCell, nameCell, categoryCell, stockCell, statusCell);
    table.prepend(row);

    nextId += 1;
    updateStats();

    form.reset();
    form.classList.remove('was-validated');
    modal.hide();

    toastMessage.textContent = `${name} se agregó correctamente.`;
    toast.show();
  });

  modalElement.addEventListener('hidden.bs.modal', () => {
    form.reset();
    form.classList.remove('was-validated');
  });

  updateStats();
}
