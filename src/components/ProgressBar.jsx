function ProgressBar() {
  return (
    <header className="progress">
      <progress value={4} max={15} />
      <p>
        Question <strong>1</strong> / 15
      </p>
      <p>
        <strong>0</strong> / 280
      </p>
    </header>
  );
}

export default ProgressBar;
