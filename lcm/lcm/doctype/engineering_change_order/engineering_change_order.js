// Copyright (c) 2025, Manju narayana ravuri and contributors
// For license information, please see license.txt

frappe.ui.form.on('New Item Revisions', {  
    item: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];

        if (row.item) {
            frappe.call({
                method: "frappe.client.get_list",
                args: {
                    doctype: "BOM",
                    filters: { item: row.item, is_active: 1 },
                    fields: ["name"],
                    limit_page_length: 1
                },
                callback: function(r) {
                    if (r.message && r.message.length > 0) {
                        row.bom = r.message[0].name; 
                    } else {
                        row.bom = "";
                    }
                    frm.refresh_field("new_item_revisions");  
                }
            });
        }
    }
});




frappe.ui.form.on('Engineering Change Order', {
    onload: function(frm) {
        if (frm.is_new() && !frm.doc.effective_date) {
            frm.set_value('effective_date', frappe.datetime.get_today());
        }
    }
});
