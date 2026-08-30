import Button from '../components/Button';

export default function SettingsPage() {
  return (
    <div className="page-panel">
      <div className="card">
        <div className="card-header">
          <h3>Profile</h3>
        </div>
        <div className="form-grid">
          <div className="form-field">
            <label>Store name</label>
            <input className="text-input" defaultValue="EcomPulse Studio" />
          </div>
          <div className="form-field">
            <label>Owner</label>
            <input className="text-input" defaultValue="Poorni" />
          </div>
          <div className="form-field">
            <label>Email</label>
            <input className="text-input" defaultValue="poorni@ecompulse.com" />
          </div>
          <div className="form-field">
            <label>Phone</label>
            <input className="text-input" defaultValue="+1 415 224 8810" />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Store information</h3>
        </div>
        <div className="form-grid">
          <div className="form-field">
            <label>Business type</label>
            <select className="select-input" defaultValue="Retail">
              <option value="Retail">Retail</option>
              <option value="Marketplace">Marketplace</option>
              <option value="Wholesale">Wholesale</option>
            </select>
          </div>
          <div className="form-field">
            <label>Primary currency</label>
            <select className="select-input" defaultValue="USD">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Notifications</h3>
        </div>
        <div className="list-block">
          <label className="list-row"><span>Order alerts</span><input type="checkbox" defaultChecked /></label>
          <label className="list-row"><span>Inventory warnings</span><input type="checkbox" defaultChecked /></label>
          <label className="list-row"><span>Weekly reports</span><input type="checkbox" /></label>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Appearance</h3>
        </div>
        <div className="form-grid">
          <div className="form-field">
            <label>Theme</label>
            <select className="select-input" defaultValue="Light">
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
              <option value="System">System</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field-row" style={{ justifyContent: 'flex-end' }}>
        <Button type="button" variant="secondary">Save settings</Button>
      </div>
    </div>
  );
}
