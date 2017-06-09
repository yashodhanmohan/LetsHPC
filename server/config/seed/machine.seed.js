import Machine from '../../api/machine/machine.model';

let p1a1 = '5861484d2c3e861ba6b390f1',
    p1a2 = '5861484d2c3e861ba6b390f2',
    p1a3 = '5861484d2c3e861ba6b390f3',
    p1a4 = '5861484d2c3e861ba6b390f4';

let p2a1 = '5861484d2c3e861ba6b390f5',
    p2a3 = '5861484d2c3e861ba6b390f7',
    p2a4 = '5861484d2c3e861ba6b390f8';

let category1 = '58614771d3a6681abe39abb2',
    category2 = '58614771d3a6681abe39abb3';

let machine1 = '5861484d2c3e861ba6b380f4',
    machine2 = '5861484d2c3e861ba6b380f5',
    machine3 = '5861484d2c3e861ba6b380f6',
    machine4 = '5861484d2c3e861ba6b380f7';

let problem1 = '5861484d2c3e861ba6b380f2',
    problem2 = '5861484d2c3e861ba6b380f3';

let user1 = '58614771d3a6681abe39abb1';
// Create machines
Machine.find({}).remove()
    .then(() => {
        Machine
            .create({
                _id: machine1,
                machine_file: '/path/to/file1'
            });
        Machine
            .create({
                "_id": machine2,
                "machine_file": '/path/to/file2',
                "architecture": "x86_64",
                "cpu_opmode": "32-bit, 64-bit",
                "byte_order": "Little Endian",
                "cpu_count": 12,
                "threads_per_core": 1,
                "cores_per_socket": 6,
                "socket_count": 2,
                "numa_node_count": 2,
                "vendor_id": "GenuineIntel",
                "cpu_family": "6",
                "model": "63",
                "model_name": "Intel(R) Xeon(R) CPU E5-2620 v3 @ 2.40GHz",
                "stepping": 2,
                "cpu_mhz": 1777.875,
                "cpu_max_mhz": null,
                "cpu_min_mhz": null,
                "bogomips": 4804.16,
                "virtualization": "VT-x",
                "L1d_cache": "32K",
                "L1i_cache": "32K",
                "L2_cache": "256K",
                "L3_cache": "15360K",
                "spec_file_link": "https://ark.intel.com/products/83352/Intel-Xeon-Processor-E5-2620-v3-15M-Cache-2_40-GHz"
            });
        Machine
            .create({
                _id: machine3,
                machine_file: '/path/to/file3',
                "architecture": "x86_64",
            	"cpu_opmode": "32-bit, 64-bit",
            	"byte_order": "Little Endian",
            	"cpu_count": 32,
            	"threads_per_core": 2,
            	"cores_per_socket": 8,
            	"socket_count": 2,
            	"numa_node_count": 2,
            	"vendor_id": "GenuineIntel",
            	"cpu_family": "6",
            	"model": "62",
                "model_name": "Intel(R) Xeon(R) CPU E5-2640 v2 @ 2.00GHz",
            	"stepping": 4,
            	"cpu_mhz": 1200,
            	"cpu_max_mhz": null,
            	"cpu_min_mhz": null,
            	"bogomips": 3999.44,
            	"virtualization": "VT-x",
            	"L1d_cache": "32K",
            	"L1i_cache": "32K",
            	"L2_cache": "256K",
            	"L3_cache": "20480K",
                "spec_file_link":"https://ark.intel.com/products/75267/Intel-Xeon-Processor-E5-2640-v2-20M-Cache-2_00-GHz"
            });
        Machine
            .create({
                "_id": machine4,
                "machine_file": '/path/to/file4',
                "architecture": "x86_64",
                "cpu_opmode": "32-bit, 64-bit",
                "byte_order": "Little Endian",
                "cpu_count": 4,
                "threads_per_core": 1,
                "cores_per_socket": 4,
                "socket_count": 1,
                "numa_node_count": 1,
                "vendor_id": "GenuineIntel",
                "cpu_family": "6",
                "model": "60",
                "model_name": "Intel(R) Core(TM) i54590 CPU@3.30 GHz",
                "stepping": 3,
                "cpu_mhz": 800,
                "cpu_max_mhz": null,
                "cpu_min_mhz": null,
                "bogomips": 6585.26,
                "virtualization": "VT-x",
                "L1d_cache": "32K",
                "L1i_cache": "32K",
                "L2_cache": "256K",
                "L3_cache": "6144K",
                "spec_file_link": "http://ark.intel.com/products/80815/Intel-Core-i5-4590-Processor-6M-Cache-up-to-3_70-GHz"
            });
    });

