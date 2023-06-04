function showError(errorMsg, node) {
    node.textContent = errorMsg;

    const errorToast = document.querySelector('.toast');
    const bootstrapToast = bootstrap.Toast.getOrCreateInstance(errorToast);

    bootstrapToast.show();
}

export default showError;