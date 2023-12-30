import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Modal, Button, Table, Input } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import { ColumnType } from 'antd/lib/table';

interface CSVViewerEditorProps {
  open: boolean;
  onCancel: () => void;
  csvFile: File | null;
}

const styles = {
  modal: {
    maxWidth: '800px',
    width: '100%',
  },
  table: {
    marginTop: '20px',
    maxWidth: '600px', 
    width: '100%',// Set a maximum height for the table
    overflow: 'auto', // Enable vertical scroll if the content exceeds the height
  },
  input: {
    width: '100%',
  },
};

const CSVViewerEditor: React.FC<CSVViewerEditorProps> = ({ open, onCancel, csvFile }) => {
  const [, setCSVData] = useState<string[][]>([]);
  const [editedData, setEditedData] = useState<string[][]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const readCSVFile = async () => {
      if (csvFile) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target) {
            const result = event.target.result as string;
            const workbook = XLSX.read(result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Explicitly type the result of XLSX.utils.sheet_to_json
            const data: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            setCSVData(data);
            setEditedData(data);
          }
        };
        reader.readAsBinaryString(csvFile);
      }
    };

    readCSVFile();
  }, [csvFile]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // You can perform additional save logic here if needed
  };

  const handleExportCSV = () => {
    const ws = XLSX.utils.aoa_to_sheet(editedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    XLSX.writeFile(wb, 'exported_data.csv');
  };

  const handleInputChange = (value: string, rowIndex: number, colIndex: number) => {
    if (rowIndex === -1) {
      // Skip updating header row
      return;
    }

    const newData = editedData.map((row, i) =>
      i === rowIndex+1 ? row.map((cell, j) => (j === colIndex ? value : cell)) : row
    );
    setEditedData(newData);
  };

  const columns: ColumnType<string[]>[] = (editedData[0] || []).map((header, index) => ({
    dataIndex: index.toString(),
    title: header,
    render: (value: any, _record: string[], rowIndex: number) => (
      <Input
        value={value}
        onChange={(e) => handleInputChange(e.target.value, rowIndex, index ?? 0)}
       // disabled={!isEditing || rowIndex === 0}
      />
    ),
  }));

  return (
    <Modal
      title="Edit Patient Data File"
      visible={open}
      style={styles.modal}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        isEditing ? (
          <Button key="save" type="primary" onClick={handleSaveClick}>
            Save
          </Button>
        ) : (
          <Button key="edit" type="primary" onClick={handleEditClick} hidden={true}>
            Edit
          </Button>
        ),
        <Button key="export" type="primary" onClick={handleExportCSV} icon={<FileExcelOutlined />}>
          Export CSV
        </Button>,
      ]}
    >
      <Table
        dataSource={editedData.slice(1)}
        style={styles.table}
        columns={columns}
        pagination={false}
        rowKey={(record, index) => (index !== undefined ? index.toString() : record.join('_'))}
      />
    </Modal>
  );
};

export default CSVViewerEditor;
